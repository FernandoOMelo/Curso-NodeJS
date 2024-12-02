const fs = require('fs');

const caminhoArquivo = process.argv;
const link = caminhoArquivo[3];

fs.readFile(link, 'utf-8', (erro, texto) => {
    quebraEmParagrafos(texto);
})

function limpaPalavras(palavra){
    return palavra.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
}

function quebraEmParagrafos(texto){
    const paragrafos = texto.toLowerCase().split('\n');

    const contagem = paragrafos.flatMap((paragrafo) => {
        if (!paragrafo) return [];
        return verificaPalavrasDuplicadas(paragrafo);
    })
    console.log(contagem);
}

function verificaPalavrasDuplicadas(texto){
    const listaPalavras = texto.split(' ');
    const resultado = {};
    
    listaPalavras.forEach(palavra => {
        if (palavra.length >= 3){
            const palavraLimpa = limpaPalavras(palavra);
            resultado[palavraLimpa] = (resultado[palavraLimpa] || 0) + 1;
        }
    });

    return resultado;

}