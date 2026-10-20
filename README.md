# FELY PROSPECT AI

Aplicação da Fely e Amigos | Soluções Digitais para pesquisar empresas, analisar websites e preparar tarefas de prospeção comercial.

## O que a versão atual inclui

- Interface responsiva em português para telemóvel e computador.
- Formulário de pesquisa empresarial por país, cidade, setor e palavras-chave.
- Área para analisar um website público.
- **Assistente IA — preparação de pedidos:** cria um prompt comercial com regras de verificação de fontes, que pode ser copiado para esta conversa do ChatGPT ou para outro modelo.
- Estrutura pensada para permitir, futuramente, fornecedores de IA diferentes (por exemplo, OpenAI, Google Gemini e outros), sem prender a interface a um único fornecedor.
- Sem CRM, contas de utilizador ou base de dados de clientes nesta fase.

## Importante: o que funciona sem outro servidor

O GitHub Pages pode publicar a interface estática. A área **Assistente IA** prepara e copia pedidos; não é uma conversa automática incorporada nem chama um modelo diretamente.

A pesquisa e a análise Firecrawl, no entanto, dependem de uma chamada segura à API. O GitHub Pages não executa funções de servidor. O ficheiro `api/search.js` é uma função Node/serverless e não funciona apenas por estar guardado no GitHub Pages.

**Não coloques uma chave da Firecrawl, OpenAI, Gemini ou de qualquer fornecedor no HTML/JavaScript público.** Uma chave no navegador pode ser extraída por qualquer visitante. Para ativar pesquisas Firecrawl automáticas e conversação com modelos dentro da aplicação, será necessário configurar um backend seguro ou uma integração autorizada que forneça essa capacidade.

## Como publicar apenas a interface no GitHub Pages

1. No repositório, abre **Settings → Pages**.
2. Em *Build and deployment*, seleciona *Deploy from a branch*.
3. Escolhe a branch `main` e a pasta `/ (root)), e guarda.
4. Aguarda a publicação indicada pelo GitHub Pages.

A interface estática e o gerador de pedidos do assistente poderão ser utilizados. As chamadas a `/api/search` continuarão indisponíveis no GitHub Pages até existir um backend.

## Integração futura com vários modelos

A integração deverá utilizar uma camada de servidor que:
- mantenha as credenciais como variáveis de ambiente secretas;
- escolha o fornecedor/modelo configurado;
- valide entradas e limites de utilização;
- devolva respostas ao frontend sem expor chaves;
- permita desativar fornecedores não configurados.

A seleção OpenAI/Gemini nesta fase é uma preferência usada na preparação do pedido, não uma ligação ativa a essas APIs. O acesso a modelos e a utilização do Firecrawl podem estar sujeitos a limites, créditos ou custos do fornecedor.

## Privacidade e qualidade

- Utiliza apenas informações empresariais publicamente acessíveis e relevantes.
- Apresenta e verifica as fontes antes de utilizar os dados.
- Não inventa contactos nem garante que todos os campos estejam disponíveis.
- Não envia mensagens nem contacta empresas automaticamente.
- Respeita os termos dos websites, as restrições aplicáveis e a legislação local.
