const btn = document.getElementById("buttonPDF")
const lista = document.getElementById("list")
const p = document.createElement("p")
const span = document.createElement("span")
const content = document.getElementById("content")

const url = 'http://localhost:3000/all'

async function allData() {
    await fetch(url)
        .then(res => res.json())
        .then(res => {
            p.innerText = res.results.toString()
            lista.appendChild(p)
            span.innerText = 'Total: ' + res.count
            content.appendChild(span)
        })
}

btn.addEventListener('click', () => {
    const options = {
        margin: [10,25,10,-15],
        filename: "arquivo.pdf",
        html2canvas: {scale: 2},
        jsPDF: {unit: "mm", format: "a4", orientation: "portrait"}
    }
    

    html2pdf(content, options)
})