# Portfolio Website

Este é um projeto de website de portfólio desenvolvido em PHP.

## Requisitos

- PHP 8.0 ou superior
- Composer
- DDEV (para ambiente de desenvolvimento local)

## Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
cd portfolio
```

2. Instale as dependências usando o Composer:
```bash
composer install
```

3. Configure o DDEV (se ainda não estiver configurado):
```bash
ddev start
```

## Executando o Projeto

### Usando DDEV (Recomendado)
```bash
ddev start
```
O site estará disponível em: https://portfolio.ddev.site

### Usando PHP Built-in Server
```bash
php -S localhost:8000
```
O site estará disponível em: http://localhost:8000

## Estrutura do Projeto

- `index.html` - Página principal do site
- `vendor/` - Dependências do Composer
- `src/` - Código fonte da aplicação

## Desenvolvimento

Para desenvolvimento local, recomenda-se usar o DDEV, que fornece um ambiente de desenvolvimento consistente com:
- PHP 8.0
- Servidor web configurado
- SSL local
- Hot-reloading

## Notas

- Certifique-se de que todas as dependências estão instaladas antes de executar o projeto
- O DDEV precisa estar instalado e configurado corretamente para o ambiente de desenvolvimento
- Para mais informações sobre o DDEV, consulte a [documentação oficial](https://ddev.readthedocs.io/) 