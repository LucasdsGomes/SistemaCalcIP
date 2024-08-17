*Calculadora de IP*

Este projeto é uma aplicação web simples que implementa uma Calculadora de IP. Desenvolvida em JavaScript, com um servidor em Golang a aplicação permite calcular e verificar informações relacionadas a endereços IP e sub-redes. Ela conta com uma interface web básica, construída utilizando HTML e CSS para persistir dados.

![image](https://github.com/user-attachments/assets/3c4401b6-6939-47d9-bf62-138236ccd5d8)


*Índice*

-> Funcionalidades
-> Estrutura do Projeto
-> Pré-requisitos
-> Instalação

*Funcionalidades*

Cálculo de Sub-redes: Realize cálculos de sub-redes com base em um endereço IP fornecido.
Validação de IPs: Verifique se um endereço IP é válido e obtenha detalhes sobre ele.
Interface Web: Interface simples e responsiva construída com HTML e CSS.
Persistência de Dados: Utiliza PostgreSQL para armazenar o histórico de cálculos ou outras informações relevantes.

*Estrutura do Projeto*

A estrutura do projeto segue boas práticas de organização de código, separando a lógica do servidor, arquivos estáticos e templates HTML:

meu-projeto/
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── images/
│   │   └── meuip_logo.png
        └── iconIp.png
│   ├── js/
│   │   └── script.js
├── templates/
│   ├── base.html
├── main.go
├── go.mod

assets/: Contém os arquivos estáticos (CSS, imagens, scripts JS).
templates/: Templates HTML usados para renderizar as páginas da aplicação.
main.go: Arquivo principal que configura o servidor, define as rotas e inicializa a aplicação.
go.mod Gerencia as dependências do projeto Go.

*Pré-requisitos*

Antes de começar, você precisará ter as seguintes ferramentas instaladas:

Go (versão 1.16 ou superior)

*Instalação*

Clone o repositório:

git clone https://github.com/seu-usuario/calculadora-ip.git
cd calculadora-ip

Instale as dependências do Go:

go mod tidy

*PARA INICIAR O PROJETO É NECESSÁRIO EFETUAR O COMANDO:*

go run main.go
