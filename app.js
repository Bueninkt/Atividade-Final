/* ***********************
* Objetivo: API para o uso das funcções.
* Data: 1/12/2024  
* Autor: Gustavo Deodato 
* ************************/

/* Para criar uma API devemos instalar: 

     express         npm install express --save          - Serve para criar a API
     cors            npm install cors --save             - Serve para configurar as permissoes do header
     body-parser     npm install body-parser --save      - Serve para manipular os dados de entrada na API pelo body
*/

//import das bibliotecas para a api
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//incializando a utilização do express através da variavel app
const app = express()

// request = significa a chegada de dados na api 
// response = saida de dados na api 
// next = 
app.use((request, response, next)=>{
    //permissão de acessi para quem irá criar a API
    response.header('Acess-Control-Allow-Origin', '*')
    //permissão de acesso para os metodos da api
    response.header('Acess-Control-Allow-Methods', 'GET')
    //ativa as configurações do header para o cors 
    app.use(cors())

    next()
})

//import arquivo funções 
var funcoes = require('./modulo/funcao.js')

//Iniciando os end-point 
//1 - end-point que retorna a lista de cursos existentes 
app.get('/v1/lion-school/cursos', cors(), async function(request, response){
   let dados = funcoes.getListadeCursos() 

   response.status(200)
   response.json(dados)
})

//2 - end-point que retorna uma lista de alunos matriculados  

 app.get('/v1/lion-school/alunos', cors (), async function (request, response){
    let dados = funcoes.getListaAlunos()    

    response.status(200)
    response.json(dados)

})


// 3 - end-point que retorna um filtro com base na matricula dos alunos 
app.get('/v1/lion-school/alunos/:matricula', cors (), async function (request, response) {
    let matricula = request.params.matricula
    let dados = funcoes.getMatricula(matricula)

    if(dados){    
    response.status(200)
    response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi encontrado um aluno.3'})
    }
    
})
//4. end-point que retorna um filtro dos alunos matriculados em certo curso
app.get('/v1/lion-school/alunos/cursos/:sigla', cors (), async function (request, response) {
    let curso = request.params.sigla
    let dados = funcoes.getFiltroCurso(curso)

    if(dados){    
        response.status(200)
        response.json(dados)
        }else{
            response.status(404)
            response.json({'status': 404, 'message': 'Não foi encontrado um aluno.4'})
        }
})

// 5 - end-point que retorna alunos por status 
app.get('/v1/lion-school/alunos/filtro', cors (), async function (request, response) {
    let status = request.query.status
    let dados = funcoes.getFiltroStatus(status)

    if(dados){    
        response.status(200)
        response.json(dados)
        }else{
            response.status(404)
            response.json({'status': 404, 'message': 'Não foi encontrado um aluno.5'})
        }
})


//6. end-point qe retorna filtro por reprovado aprovado ou exame 
app.get('/v1/lion-school/alunos/:filtro', (req, res) => {
    const sigla = req.query.sigla
    const alunos = funcoes.getFiltroResultado(sigla)
    if (alunos) {
        res.json(alunos);
    } else {
        res.status(404).json({ error: 'Nenhum aluno encontrado para este curso.' })
    }
})

//7. end-point que retorna filtro por alunos por curso e ano de conclusão
app.get('/v1/lion-school/alunos/:filtro', (req, res) => {
    const { sigla, ano } = req.query
    const dados = funcoes.getFiltroAnoCurso(sigla, ano)
    if (dados) {
        res.json(dados)
    } else {
        res.status(404).json({ error: 'Nenhum aluno encontrado para este curso e ano.' })
    }
})

app.listen('8080', function(){
    console.log('API funcionando e aguardando requisições..')
})