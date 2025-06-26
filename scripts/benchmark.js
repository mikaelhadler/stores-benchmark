import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

console.log('🚀 Iniciando análise de benchmark...\n')

// Função para analisar o tamanho do bundle
function analyzeBundleSize() {
  try {
    console.log('📦 Analisando tamanho do bundle...')
    
    // Verificar se o build existe
    const distPath = path.join(process.cwd(), 'dist')
    if (!fs.existsSync(distPath)) {
      console.log('❌ Build não encontrado. Execute "npm run build" primeiro.')
      return
    }

    // Analisar arquivos do bundle
    const files = fs.readdirSync(distPath)
    const jsFiles = files.filter(file => file.endsWith('.js'))
    
    let totalSize = 0
    console.log('\n📊 Tamanho dos arquivos:')
    
    jsFiles.forEach(file => {
      const filePath = path.join(distPath, file)
      const stats = fs.statSync(filePath)
      const sizeKB = (stats.size / 1024).toFixed(2)
      totalSize += stats.size
      
      console.log(`  ${file}: ${sizeKB} KB`)
    })
    
    console.log(`\n📈 Tamanho total: ${(totalSize / 1024).toFixed(2)} KB`)
    
    // Análise por chunk
    const vendorChunks = jsFiles.filter(file => file.includes('vendor'))
    const appChunks = jsFiles.filter(file => !file.includes('vendor'))
    
    console.log('\n🔍 Análise por chunks:')
    console.log(`  Vendor chunks: ${vendorChunks.length} arquivos`)
    console.log(`  App chunks: ${appChunks.length} arquivos`)
    
    return {
      totalSize: totalSize / 1024,
      jsFiles: jsFiles.length,
      vendorChunks: vendorChunks.length,
      appChunks: appChunks.length
    }
    
  } catch (error) {
    console.error('❌ Erro ao analisar bundle:', error.message)
    return null
  }
}

// Função para executar Lighthouse
function runLighthouse() {
  try {
    console.log('\n🔍 Executando análise de performance...')
    
    // Verificar se o Lighthouse está instalado
    try {
      execSync('lighthouse --version', { stdio: 'pipe' })
    } catch {
      console.log('⚠️  Lighthouse não encontrado. Instalando...')
      execSync('npm install -g lighthouse', { stdio: 'inherit' })
    }
    
    // Executar Lighthouse
    const lighthouseCommand = 'lighthouse http://localhost:4173 --output=json --output-path=./lighthouse-report.json --chrome-flags="--headless"'
    
    console.log('⏳ Executando Lighthouse (isso pode demorar alguns minutos)...')
    execSync(lighthouseCommand, { stdio: 'inherit' })
    
    // Ler resultados
    if (fs.existsSync('./lighthouse-report.json')) {
      const report = JSON.parse(fs.readFileSync('./lighthouse-report.json', 'utf8'))
      const scores = report.lhr.categories
      
      console.log('\n📊 Resultados do Lighthouse:')
      console.log(`  Performance: ${(scores.performance.score * 100).toFixed(1)}%`)
      console.log(`  Accessibility: ${(scores.accessibility.score * 100).toFixed(1)}%`)
      console.log(`  Best Practices: ${(scores['best-practices'].score * 100).toFixed(1)}%`)
      console.log(`  SEO: ${(scores.seo.score * 100).toFixed(1)}%`)
      
      return scores
    }
    
  } catch (error) {
    console.error('❌ Erro ao executar Lighthouse:', error.message)
    return null
  }
}

// Função principal
async function main() {
  console.log('🎯 Benchmark: Nanostores vs Redux\n')
  
  // Análise do bundle
  const bundleAnalysis = analyzeBundleSize()
  
  // Análise de performance (requer servidor rodando)
  console.log('\n💡 Para análise completa de performance:')
  console.log('1. Execute "npm run build"')
  console.log('2. Execute "npm run preview"')
  console.log('3. Execute "npm run benchmark" novamente')
  
  // Gerar relatório
  const report = {
    timestamp: new Date().toISOString(),
    bundleAnalysis,
    recommendations: {
      redux: {
        pros: [
          'Mais maduro e amplamente adotado',
          'Ferramentas de desenvolvimento robustas',
          'Padrão bem estabelecido',
          'Excelente para aplicações grandes'
        ],
        cons: [
          'Bundle size maior',
          'Boilerplate mais verboso',
          'Curva de aprendizado mais íngreme'
        ]
      },
      nanostores: {
        pros: [
          'Extremamente leve (2.1KB vs 13.5KB)',
          'API simples e intuitiva',
          'Performance otimizada',
          'Menor bundle size'
        ],
        cons: [
          'Menos maduro',
          'Ferramentas de desenvolvimento limitadas',
          'Comunidade menor'
        ]
      }
    }
  }
  
  // Salvar relatório
  fs.writeFileSync('./benchmark-report.json', JSON.stringify(report, null, 2))
  console.log('\n📄 Relatório salvo em: benchmark-report.json')
  
  console.log('\n✅ Análise concluída!')
}

main().catch(console.error) 