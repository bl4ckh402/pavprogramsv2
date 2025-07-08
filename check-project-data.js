#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

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
