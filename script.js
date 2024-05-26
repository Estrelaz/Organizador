let colunaSelecionada = "";
let botaoSelecionado = null;

function organizarDados(coluna) {
    const texto = document.getElementById("dadosInput").value;
    localStorage.setItem("dadosInput", texto);

    // Remove a classe da coluna anteriormente selecionada, se houver
    if (colunaSelecionada !== "") {
        const colunaAnterior = document.getElementById(colunaSelecionada);
        if (colunaAnterior) {
            colunaAnterior.classList.remove("selected-column");
        }
    }

    // Seleciona a nova coluna e adiciona a classe
    const colunaAtual = document.getElementById(coluna);
    if (colunaAtual) {
        colunaAtual.classList.add("selected-column");
        colunaSelecionada = coluna;
    }

    // Muda a cor do botão pressionado
    if (botaoSelecionado) {
        botaoSelecionado.classList.remove("selected");
    }
    const botoes = document.querySelectorAll(".button");
    botoes.forEach(button => {
        if (button.innerText === coluna) {
            button.classList.add("selected");
            botaoSelecionado = button;
        }
    });

    const linhas = texto.split('\n');
    const tabela = document.getElementById("tabelaDados");
    tabela.innerHTML = "";

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

    const tbody = document.createElement("tbody");
    const dadosTabela = linhas.map(linha => {
        const dados = linha.split(' - ').map(item => item.split(': ')[1]);
        return dados;
    });

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
    const dadosSalvos = localStorage.getItem("dadosInput");
    if (dadosSalvos) {
        document.getElementById("dadosInput").value = dadosSalvos;
        organizarDados("Level");
    }
}
