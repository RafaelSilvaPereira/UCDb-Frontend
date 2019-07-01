/**
 * @Author: Rafael da Silva Pereira Matricula: 117110921. UFCG: Ciência da Computação.
 * Modulo util do sistema.
 */
export {isNumber}


const isNumber = (n) => !isNaN(parseFloat(n)) && isFinite(n); // infelizmente depois do refatoramento o modulo fico simples demais
