# Store Benchmark: Nanostores vs Redux

Uma aplicação React para comparar a performance entre **Nanostores** e **Redux Toolkit** em diferentes cenários.

## 🎯 Objetivo

Este projeto demonstra e compara as diferenças de performance, bundle size e facilidade de uso entre duas soluções populares de gerenciamento de estado:

- **Redux Toolkit** - A solução oficial e mais madura
- **Nanostores** - Uma alternativa ultra-leve e performática

## 🚀 Tecnologias

- **React 18** com TypeScript
- **Vite** para build e desenvolvimento
- **Tailwind CSS** para estilização
- **React Router** para navegação
- **Redux Toolkit** + **React Redux**
- **Nanostores** + **@nanostores/react**

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Análise de bundle
npm run analyze

# Executar benchmark completo
npm run benchmark
```

## 🏗️ Estrutura do Projeto

```
src/
├── components/
│   ├── BenchmarkApp.tsx      # App principal com navegação
│   ├── ReduxBenchmark.tsx    # Benchmark do Redux
│   ├── NanostoresBenchmark.tsx # Benchmark do Nanostores
│   └── BenchmarkResults.tsx  # Resultados comparativos
├── stores/
│   ├── redux-store.ts        # Store Redux com Redux Toolkit
│   └── nanostores-store.ts   # Store Nanostores
├── App.tsx                   # Componente raiz
├── main.tsx                  # Ponto de entrada
└── index.css                 # Estilos globais
```

## 📊 Métricas de Benchmark

A aplicação testa e compara:

### 1. **Performance**
- **Tempo de Renderização**: Tempo para renderizar componentes
- **Tempo de Atualização**: Tempo para atualizar o estado
- **Operações por Segundo**: Quantidade de operações executadas por segundo

### 2. **Recursos**
- **Uso de Memória**: Consumo de memória heap
- **Bundle Size**: Tamanho do bundle JavaScript

### 3. **Funcionalidades Testadas**
- Contador simples (increment/decrement)
- Lista de todos (CRUD completo)
- Operações em lote
- Múltiplas atualizações simultâneas

## 🎮 Como Usar

1. **Execute a aplicação**:
   ```bash
   npm run dev
   ```

2. **Navegue entre as abas**:
   - **Redux**: Teste o Redux Toolkit
   - **Nanostores**: Teste o Nanostores
   - **Resultados**: Veja a comparação

3. **Execute os benchmarks**:
   - Clique em "Executar Benchmark" em cada aba
   - Compare os resultados na aba "Resultados"

4. **Teste funcionalidades**:
   - Adicione/remova todos
   - Incremente o contador
   - Execute operações em lote

## 📈 Resultados Esperados

### Redux Toolkit
- **Bundle Size**: ~13.5KB
- **Vantagens**: Maduro, ferramentas robustas, padrão estabelecido
- **Desvantagens**: Bundle maior, mais boilerplate

### Nanostores
- **Bundle Size**: ~2.1KB
- **Vantagens**: Ultra-leve, API simples, performance otimizada
- **Desvantagens**: Menos maduro, ferramentas limitadas

## 🔧 Configuração Avançada

### Análise de Bundle
```bash
npm run analyze
```
Gera um relatório detalhado do tamanho de cada chunk.

### Benchmark Automatizado
```bash
npm run benchmark
```
Executa análise completa incluindo:
- Tamanho do bundle
- Análise de chunks
- Recomendações

### Build Otimizado
O Vite está configurado com:
- Code splitting automático
- Chunks separados para vendor libraries
- Tree shaking otimizado

## 🎨 Interface

A aplicação possui uma interface moderna e responsiva com:

- **Navegação por abas** para diferentes stores
- **Métricas em tempo real** durante os benchmarks
- **Tabela comparativa** com diferenças percentuais
- **Design responsivo** com Tailwind CSS
- **Indicadores visuais** para vencedores de cada métrica

## 📝 Considerações

### Quando Usar Redux Toolkit
- Aplicações grandes e complexas
- Equipes grandes com diferentes níveis de experiência
- Necessidade de ferramentas de desenvolvimento avançadas
- Projetos que precisam de padrões bem estabelecidos

### Quando Usar Nanostores
- Aplicações pequenas a médias
- Projetos que priorizam performance
- Equipes que preferem APIs simples
- Aplicações com restrições de bundle size

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo `LICENSE` para mais detalhes.

## 🙏 Agradecimentos

- [Redux Toolkit](https://redux-toolkit.js.org/) - A solução oficial do Redux
- [Nanostores](https://github.com/nanostores/nanostores) - Estado reativo minimalista
- [Vite](https://vitejs.dev/) - Build tool rápida
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitário 