let colunaSelecionada = "";

function organizarDados(coluna) {
    // Obtendo o valor do texto inserido na caixa de texto
    const texto = document.getElementById("dadosInput").value;

    // Salvando o texto no localStorage
    localStorage.setItem("dadosInput", texto);

    // Removendo a classe da coluna anteriormente selecionada, se houver
    if (colunaSelecionada !== "") {
        const colunaAnterior = document.getElementById(colunaSelecionada);
        if (colunaAnterior) {
            colunaAnterior.classList.remove("selected-column");
        }
    }

    // Selecionando a coluna atual e adicionando a classe
    const colunaAtual = document.getElementById(coluna);
    if (colunaAtual) {
        colunaAtual.classList.add("selected-column");
        colunaSelecionada = coluna;
    }

    // Separando as linhas de entrada
    const linhas = texto.split('\n');

    // Limpando a tabela antes de adicionar novos dados
    const tabela = document.getElementById("tabelaDados");
    tabela.innerHTML = "";

    // Adicionando cabeçalho à tabela
    const cabecalho = ["Login", "RiotId", "Level", "Region", "Solo/Duo", "Flex", "Skins", "Champions", "RP", "BE"];
    const thead = document.createElement("thead");
    const trHead = document.createElement("tr");
    cabecalho.forEach(item => {
        const th = document.createElement("th");
        th.textContent = item;
        th.id = item;
        if (item === coluna) {
            th.classList.add("selected-column");
        }
        trHead.appendChild(th);
    });
    thead.appendChild(trHead);
    tabela.appendChild(thead);

    // Adicionando dados à tabela
    const tbody = document.createElement("tbody");
    const dadosTabela = linhas.map(linha => {
        const dados = linha.split(' - ').map(item => item.split(': ')[1]);
        return dados;
    });

    // Ordenando os dados pela coluna selecionada em ordem decrescente
    dadosTabela.sort((a, b) => {
        const colunaIndex = cabecalho.indexOf(coluna);
        return parseInt(b[colunaIndex]) - parseInt(a[colunaIndex]);
    });

    dadosTabela.forEach(dados => {
        const tr = document.createElement("tr");
        dados.forEach(dado => {
            const td = document.createElement("td");
            td.textContent = dado;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    tabela.appendChild(tbody);
}

window.onload = function() {
    // Carregando o texto salvo do localStorage
    const dadosSalvos = localStorage.getItem("dadosInput");
    if (dadosSalvos) {
        document.getElementById("dadosInput").value = dadosSalvos;
        organizarDados("Level"); // Organiza inicialmente pela coluna "Level"
    }
}
