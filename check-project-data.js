#!/usr/bin/env node

const { createAdminClient } = require('./lib/supabase-admin.ts')
require('dotenv').config()

const supabase = createAdminClient()

async function checkDetailedProjectData() {
  try {
    console.log('🔍 Checking detailed project data...\n')
    
    const { data: projects, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.log('❌ Error fetching projects:', error.message)
      return
    }
    
    console.log(`✅ Found ${projects?.length || 0} projects:`)
    
    projects?.forEach((project, index) => {
      console.log(`\n${index + 1}. ${project.title}`)
      console.log(`   - ID: ${project.id}`)
      console.log(`   - Featured: ${project.featured}`)
      console.log(`   - Technologies: ${JSON.stringify(project.technologies)}`)
      console.log(`   - Description: ${project.description ? project.description.substring(0, 100) + '...' : 'No description'}`)
      console.log(`   - GitHub URL: ${project.github_url || 'No GitHub'}`)
      console.log(`   - Live URL: ${project.live_url || 'No live URL'}`)
      console.log(`   - Image URL: ${project.image_url || 'No image'}`)
      console.log(`   - Created At: ${project.created_at}`)
    })
    
  } catch (err) {
    console.error('❌ Error checking project data:', err.message)
  }
}

checkDetailedProjectData().catch(console.error)
