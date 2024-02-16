const url = "https://back-formulario.vercel.app/aluno"
const urlall = "https://back-formulario.vercel.app/all"
// const url = "http://localhost:3000/aluno"
// const urlall = "http://localhost:3000/all"

const form = document.getElementById('formulario');

const nome = document.getElementById('nome')
const cadastrar = document.querySelector("form > button")
const pdfList = document.getElementById('linkPdf')
const classes = cadastrar.classList

//gerar pdf
async function getAll() {
  const user = window.prompt('Digite sua senha')
  switch (user) {
    case '1234':
      break;

    default:
      pdfList.removeAttribute('href')
      alert('Usuario não permitido')
      location.reload()
      break;
  }
}

// buscar aluno
async function buscarAluno() {
  const campoID = document.getElementById('campoID');
  const id = campoID.value
  await fetch(`${url}/${id}`)
    .then(res => res.json())
    .then(res => {

      document.getElementById('nome').value = res.results.nome,
        document.getElementById('faixa').value = res.results.faixa,
        document.getElementById('telefone').value = res.results.telefone,
        document.getElementById('nascimento').value = res.results.nascimento
    })
    .catch(error => {
      console.log(error);
    })

}

// creando aluno
async function createAluno() {
  const data = {
    nome: document.getElementById('nome').value,
    faixa: document.getElementById('faixa').value,
    telefone: document.getElementById('telefone').value,
    nascimento: document.getElementById('nascimento').value
  }
  await fetch(`${url}`, {
    method: 'POST',
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(res => {
      if (res.error) {
        throw new Error(res.error)
      }
      document.getElementById("guardarId").textContent = res.id
      document.getElementById("api").style.display = "flex"
    })
    .catch(error => alert('Houve um erro: ' + error))

}

async function atualizarAluno() {
  const id = document.getElementById('campoID').value
  const data = {
    id: id,
    nome: document.getElementById('nome').value,
    faixa: document.getElementById('faixa').value,
    telefone: document.getElementById('telefone').value,
    nascimento: document.getElementById('nascimento').value
  }
  await fetch(`${url}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then((res) => {
      if (res.error) {
        throw new Error(res.error)
      }
      alert('Atualização realizada com sucesso. ', res)
    })
    .catch((error) => alert(error))

  location.reload()
}

// inserindo nome da classe true para abir janela de sucesso
cadastrar.addEventListener('click', () => {
  classes.toggle("true")
})

function displayNone() {
  classes.remove("true")
  document.getElementById("api").style.display = "none";
  location.reload()
}

form.addEventListener('submit', function (e) {
  e.preventDefault()
})

//---------delete-------
// function deleteData(id){
//   remove(ref(db, "aluno/"))
//     .then(()=>{
//       if(id)
//         alert("remove successfully")
//       else
//         throw true;
//     })
//     .catch((error)=>{
//       alert("Houve um erro "+error)
//     })
// }
//deleteData(1249980224631)