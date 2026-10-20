# FELY PROSPECT AI

Aplicação de pesquisa de empresas, leitura de websites e recolha de informações empresariais publicamente acessíveis para a Fely e Amigos | Soluções Digitais.

## Funcionalidades
- Pesquisa Web através da API Firecrawl.
- Leitura de conteúdo de websites públicos.
- Exibição de fontes para verificação.
- Interface em português, adaptável a telemóveis.
- Sem CRM, sem contas de utilizador e sem base de dados de clientes nesta fase.

## Requisito importante
A chave Firecrawl é secreta e deve ficar apenas no servidor como variável de ambiente `FIRECRAWL_API_KEY`. Nunca a coloques no HTML nem num ficheiro público.

## Executar localmente
Requer Node.js 18 ou superior.

1. Instala dependências: `npm install`
2. Define `FIRECRAWL_API_KEY` no ambiente do servidor.
3. Instala a CLI da Vercel, se necessário, e inicia: `vercel dev`
4. Abre o endereço local apresentado pela CLI.

## Publicar
Este repositório inclui uma função serverless compatível com Vercel em `api/search.js`. Importa o repositório na Vercel e adiciona `FIRECRAWL_API_KEY` em Project Settings → Environment Variables. Depois faz deploy.

O GitHub Pages, sozinho, serve apenas ficheiros estáticos e não executa a função API. Para pesquisas reais, publica a aplicação num alojamento que execute a função serverless.

## Limites e privacidade
- Os resultados dependem das fontes públicas encontradas, da disponibilidade dos websites e do plano/limites Firecrawl.
- Confirma os dados e a origem antes de contactar uma empresa.
- A aplicação não inventa contactos nem garante que todos os campos estejam disponíveis.
- Respeita termos de uso, robots/restrições aplicáveis e leis locais; evita recolher dados pessoais não necessários.
