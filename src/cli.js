import fs from 'fs';
import path from 'path';
import trataErros from './erros/funcoesErro.js';
import { contaPalavras } from './index.js';
import { log } from 'console';
import { montaSaidaArquivo } from './helpers.js';
import { Command } from 'commander';
import chalk, { Chalk } from 'chalk';

const program = new Command();

program
    .version('0.0.1')
    .option('-t, --texto <string>', 'Caminho do texto a ser processado:')
    .option('-d, --destino <string>', 'Caminho da pasta para salvar o arquivo de resultados:')
    .action((options) => {
        const { texto, destino } = options;
        if(!texto || !destino){
            console.error(chalk.red('Erro: Favor inserir caminho de origem e destino!'));
            program.help();
            return;    
        }

        const caminhoTexto = path.resolve(texto);
        const caminhoDestino = path.resolve(destino);

        try {
            processaArquivo(caminhoTexto, caminhoDestino);
            log(chalk.green('Texto processado com sucesso!'));
        } catch (error) {
            log(chalk.red('Ocorreu um erro no processamento', error));
        }
    })
program.parse();

const caminhoArquivo = process.argv;


function processaArquivo(texto, destino){
    fs.readFile(texto, 'utf-8', (erro, texto) => {
        try {
            if (erro) throw erro;
            const resultado = contaPalavras(texto);
            criaESalvaArquivo(resultado, destino);
        } catch (erro) {
            log(trataErros(erro));
        }  
    })
}



async function criaESalvaArquivo(listaPalavras, path){
    const arquivoNovo = `${path}/resultado.txt`;
    const textoPalavras = montaSaidaArquivo(listaPalavras);
    try {
       await fs.promises.writeFile(arquivoNovo, textoPalavras);
        log('Arquivo criado');
    } catch (error) {
        throw error;
    }
}