var listaCursos = require('./cursos')
var listaDealunos = require('./alunos')


//LISTAR CURSOS 
const getListaCursos = function() {
    let listar = listaCursos.cursos
    let status = false
    let cursos = []

    listar.forEach(function(item) {
        status = true
        cursos.push(item.nome) 
    })

    if (status === true) {
        return cursos
    } else {
        return false
    }
}

//console.log(getListadeCursos())


// listar alunos matriculados 

const getListaAlunos = function (){
    let AlunoEncontrados = []
    let status = false 
    let listaAlunos = listaDealunos.alunos

    listaAlunos.forEach(function(item){
        status = true
        AlunoEncontrados.push(item.nome)
    })
    if(status === true){
        return AlunoEncontrados
    }else{
        return status 
    }


}

//console.log(getListaAlunos())

// Filtro com base matricula 

const getMatriculaAluno = function(matricula){
    let listar = listaDealunos.alunos 
    let status = false 
    let matriculas = String(matricula)
    let resultado = []

    listar.forEach(function(item){
        if(item.matricula == String(matriculas)){
            status = true
            
            resultado.push({
            nome: item.nome,
            status: item.sexo
        })
        }
    })

    if( status == true){
        return resultado
    }else{
        return status 
    }
}

//console.log(getMatricula('20151001001'))

// filtrar alunos com base curso 

const getFiltroCurso = function(alsigla){
    let argumento = String(alsigla).toUpperCase()
    let status = false
    let listar = listaDealunos
    let resultado = []

    listar.alunos.forEach(function(item){
        item.curso.forEach(function(itemdois){
            if(itemdois.sigla === argumento){
                status = true
                resultado.push({nome: item.nome, sexo: item.sexo})
            }
        })
    })
    if(status === true){
        return resultado
    }else{
        return status
    }
}
//Filtro por status 

const getFiltroStatus = function (statusFiltro) {
    let alunosFiltrados = []
    let listar = listaDealunos
    let status = false 

    listar.alunos.forEach(function (aluno) {
        if (aluno.status === statusFiltro) {
            status = true
            alunosFiltrados.push({
                nome: aluno.nome,
                status: aluno.status,
                matricula: aluno.matricula,
                sexo: aluno.sexo,
                curso: aluno.curso
            })
        }
    })
    if(status == true){
        return alunosFiltrados
    }else{
        return status
    }
}

//console.log(getFiltroStatus('Finalizado'))
//Filtro alunos por curso e aprovado reprovado ou em exame

const getFiltroStatusDePermanencia = function (alsigla) {

    console.log(alsigla)
    let argumento = String(alsigla).toUpperCase()
    let listar = listaDealunos
    let resultado = []
    let status = false 

    listar.alunos.forEach(function (aluno) {
        aluno.curso.forEach(function (curso) {
            if (curso.sigla === argumento) {
                status = true 
                let disciplinasPorStatus = {
                    Aprovado: [],
                    Reprovado: [],
                    Exame: []
                }

                curso.disciplinas.forEach(function (disciplina) {
                    if (disciplina.status === "Aprovado") {
                        disciplinasPorStatus.Aprovado.push({
                            nome: disciplina.nome,
                            status: disciplina.status
                        })
                    } else if (disciplina.status === "Reprovado") {
                        disciplinasPorStatus.Reprovado.push({
                            nome: disciplina.nome,
                            status: disciplina.status
                        });
                    } else if (disciplina.status === "Exame") {
                        disciplinasPorStatus.Exame.push({
                            nome: disciplina.nome,
                            status: disciplina.status
                        })
                    }
                })

                resultado.push({
                    nome: aluno.nome,
                    matricula: aluno.matricula,
                    sexo: aluno.sexo,
                    curso: curso.nome,
                    disciplinas: disciplinasPorStatus
                })
            }
        })
    })

    if (status === true) {
        return resultado
    } else {
        return false
    }
}

//Filtro por ano e cursos 

const getFiltroCursoEAno = function (siglaCurso, anoConclusao) {
    let argumento = String(siglaCurso).toUpperCase()
    let resultado = []
    let status = false
    let listar = listaDealunos 

    listar.alunos.forEach(function (item) {
        item.curso.forEach(function (curso) {
            if (curso.sigla === argumento && curso.conclusao === String(anoConclusao)) {
                status = true 
                resultado.push({
                    nome: item.nome,
                    matricula: item.matricula,
                    sexo: item.sexo,
                    curso: curso.nome,
                    conclusao: curso.conclusao
                })
            }
        })
    })

    if (status === true) {
        return resultado
    } else {
        return false
    }
}
//console.log(getFiltroAnoCurso('ds', '2022'))
//console.log(getFiltroStatus('Finalizado'))
console.log(getFiltroStatusDePermanencia('DS'))
module.exports = {
    getListaCursos,
    getListaAlunos,
    getFiltroCurso,
    getFiltroStatus,
    getMatriculaAluno,
    getFiltroStatusDePermanencia,
    getFiltroCursoEAno
}
