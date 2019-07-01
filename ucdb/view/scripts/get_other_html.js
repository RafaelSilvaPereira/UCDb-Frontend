export {other_html, get_html_to_other_dom};


/**
 * @Author: Rafael da Silva Pereira Matricula: 117110921. UFCG: Ciência da Computação.
 * Modelo responsavel por capturar o html de outros arquivos e deixar disponivel este mesmo html em uma
 * variavel: other_html
 */

let other_html = null; /*Isso é uma referencia a o html de um nó (html de outra dom) que vai ser inserido na dom principal*/

async function get_html_to_other_dom(path) {
    let html =  await fetch(path).then(response => response.text());
    other_html = html;
}
