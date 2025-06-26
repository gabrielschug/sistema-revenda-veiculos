const prompt = require("prompt-sync")();
const fs = require("fs"); // fs: file system (para manipular aqruivos)

const nomes = [];
const categorias = [];
const igredientes = [];
const precos = [];
const fotos = [];

function inclusao() {

  // TÍTULO da Secção
  console.log('\n'+"-".repeat(83) + "\n📝 Inclusão de Produtos\n" + "-".repeat(83) + "\n")

  // ENTRADAS de Dados

  console.log(`\n🔹 Informe Nome, Categoria, Igreditentes, Preço e Imagem do produto\n\n⚠️ OBS.: Cancele a inclusão digitando '0' em qualquer entrada.\n`)
  const a = prompt("Nome do Produto......: ");
  const b = prompt("Categoria............: ").toUpperCase();
  const c = prompt("Igredientes..........: ");
  const d = Number(prompt("Preço R$.............: "));
  const e = prompt("URL  da foto.........: ");

  // Se entrou algum valor zero: CANCELA
  if ([a,b,c,d].includes('0')){
    console.log('\n🔶 A  inclusão do produto foi cancelada...\n')

  } else{
    // INCLUINDO aos vetores
    nomes.push(a);
    categorias.push(b);
    igredientes.push(c);
    precos.push(d);
    fotos.push(e);
  
    // INFO de Conclusão + SALVAR
    console.log(`\n✅ Produto Cadastrado com Sucesso!\n` + `-`.repeat(83));
    gravaProdutos();
  }
}

function listagem() {
    // TÍTULO da Secção
  console.log('\n'+"-".repeat(83) + "\n📋 Listagem dos Produtos Cadastrados\n" + "-".repeat(83) + "\n")

  console.log(
    `\nProduto............: Categoria: Igredientes............................: Preço....:\n`
  );

  for (let i in nomes) {
    console.log(
      `${nomes[i].padEnd(20)} ${categorias[i].padEnd(10)} ${igredientes[i].padEnd(40)}  R$ ${precos[i].toFixed(2)}`);
  }
  console.log()
}

function pesquisaCategoria() {
  if (fs.existsSync("produtos.txt")) {
    // SE produtos.txt existir ENTÃO...
    // Lê as linhas do .txt e fatia e separando as linhas (\n)
    const produtos = fs.readFileSync("produtos.txt", "utf-8").split("\n");

    // Título da Secção
    console.log('\n'+"-".repeat(83) + "\n🔍 Pesquisa por Categoria\n" + "-".repeat(83) + "\n");

    // Entrada da Categoria:
    const cat = prompt("🔹 Categoria............: ").toUpperCase();

    // Contador de Itens
    let contador = 0;
    for (i in categorias) {
        if (cat == categorias[i]) { // SE existir itens nesta categoria ENTÃO...
            contador++; // Conte...
        }
    }

    // Tabela dos Itens
    if (contador == 0) {// SE a Contagem deu 0 ENTÃO INFORME ...
        console.log("\n\n🔶 Não há itens nesta Categoria.");
    } else {
        console.log(`\n`+"-".repeat(83) +
        `\nProduto............: Categoria: Igredientes............................: Preço....:\n`);
        
        for (i in categorias) {
            if (cat == categorias[i]) {
            console.log(`${nomes[i].padEnd(20)} ${categorias[i].padEnd(10)} ${igredientes[i].padEnd(40)} R$ ${precos[i].toFixed(2).padStart(6)}`);
        }
        }console.log("\n");
    }
}
}

function pesquisaPreco() {
  if (fs.existsSync("produtos.txt")) {
    // SE produtos.txt existir ENTÃO...
    // Lê as linhas do .txt e fatia e separando as linhas (\n)
    const produtos = fs.readFileSync("produtos.txt", "utf-8").split("\n");

    // Título da Secção
    console.log(
      '\n'+"-".repeat(83) + "\n🔍 Pesquisa por Preço\n" + "-".repeat(83) + "\n"
    );

    // Entrada de preços mínimos e máximos:
    const min = Number(prompt("🔻 Preço Mínimo............: ")).toFixed(2);
    const max = Number(prompt("🔺 Preço Máximo............: ")).toFixed(2);

    // Contador de Itens
    let contador = 0;
    for (i in nomes) {
      if ((precos[i] >= min) & (precos[i] <= max)) {
        // SE existir preços nesta faixa de valores ENTÃO...
        contador++; // Conte...
      }

      // Tabela dos Itens
    }
    if (contador == 0) {
      // SE a Contagem deu 0 ENTÃO INFORME ...
      console.log("\n\n🔶 Não há itens nesta faixa de preços.");
    } else {
      console.log(
        `\n\n💵 Produtos entre R$ ${min} e R$ ${max}:\n` +
          `\nProduto............: Categoria: Igredientes............................: Preço....:\n`
      );

      for (i in nomes) {
        if ((precos[i] >= min) & (precos[i] <= max)) {
          console.log(
            `${nomes[i].padEnd(20)} ${categorias[i].padEnd(10)} ${igredientes[
              i
            ].padEnd(40)} R$ ${precos[i].toFixed(2).padStart(7)}`
          );
        }
      }
      console.log()
    }
  }
}

function cardapioWeb() {
  let conteudo = `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cardápio |  Lancheria Avenida</title>
    <style>
        body {  font-family: Arial; margin: 30px; background-color: white;}
        h1 { color: brown; }
        table{width: 100%; border-collapse: collapse; background-color: white; border-bottom: 1px 1px 6px #999; border-radius: 8px; overflow: hidden;}
        th, td {padding: 12px; text-align: left; border-bottom: 1px solid #ccc;}
        th{background-color: #e0dede; color: #333;}
        img{max-width: 100px; max-height: 120px; border-radius:4px;}
        tr:hover {background-color: #f9f9f9;}
    </style>

</head>
<body>
    <h1>🍔 LANCHERIA AVENIDA | Cardápio Online</h1>
    
    <table>
        <thead>

            <tr>
                <th>Produto</th>
                <th>Categoria</th>
                <th>Igredientes</th>
                <th>Preço R$</th>
                <th>Imagem Ilustrativa</th>
            </tr>
        </thead>
        <tbody>
        `;
  for (i in nomes) {
    conteudo += `
            <tr>
                <td>${nomes[i]}</td>
                <td>${categorias[i]}</td>
                <td>${igredientes[i]}</td>
                <td>${precos[i].toFixed(2)}</td>
                <td><img src="${fotos[i]}" alt="Foto do Produto"></td>
            </tr>
            `;
  }

  conteudo += `
                </tbody>
            </table>
        </body>
        </html>
        `;

  fs.writeFileSync("cardapioWeb.html", conteudo);

  console.log(
    `\n✅ Cardápio gerado com sucesso\nAcesse aqui: file:///C:/Users/gabri/Documents/GitHub/programa-lancheria/cardapioWeb.html`
  );
}

function CardapioporCategoria() {
  
  // Título da Secção
  console.log("-".repeat(83) + "\n🔍 Cadápio por Categoria Web\n" + "-".repeat(83) + "\n");

  // Entrada da Categoria

  const cat = prompt("🔹 Categoria............: ").toUpperCase();

  // Contador de Itens
  let contador = 0;
  for (i in categorias) {
      if (cat == categorias[i]) { // SE existir itens nesta categoria ENTÃO...
          contador++; // Conte...
      }
  }

  let conteudoInicio
  let conteudoMeio
    // Início da página
    conteudoInicio = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Cardápio |  Lancheria Avenida</title>
      <style>
      body {  font-family: Arial; margin: 30px; background-color: white;}
      h1 { color: brown; }
      table{width: 100%; border-collapse: collapse; background-color: white; border-bottom: 1px 1px 6px #999; border-radius: 8px; overflow: hidden;}
      th, td {padding: 12px; text-align: left; border-bottom: 1px solid #ccc;}
      th{background-color: #e0dede; color: #333;}
      img{max-width: 100px; max-height: 120px; border-radius:4px;}
      tr:hover {background-color: #f9f9f9;}
      </style>
      </head>
      <body>
      <h1>🍔 LANCHERIA AVENIDA | Cardápio Online</h1>
      ` 

    // Tabela dos Itens
    if (contador == 0) {// SE a Contagem deu 0 ENTÃO ...
        console.log("\n🔶 Não há itens nesta Categoria...\n")
        conteudoMeio = `
        <h3>🔶 Não há itens nesta Categoria...</h3>
        </body>
        </html>
        `
      } else {
        conteudoMeio = `
          <table>
            <thead>    
              <tr>
                <th>Produto</th>
                <th>Categoria</th>
                <th>Igredientes</th>
                <th>Preço R$</th>
                <th>Imagem Ilustrativa</th>      
        `

      for (i in categorias) {
        if (cat == categorias[i]) { // SE existir itens nesta categoria ENTÃO...
          conteudoMeio+=`
          <tr>
              <td>${nomes[i]}</td>
              <td>${categorias[i]}</td>
              <td>${igredientes[i]}</td>
              <td>${precos[i].toFixed(2)}</td>
              <td><img src="${fotos[i]}" alt="Foto do Produto"></td>
              `
        }
      }

        conteudoMeio += `
          </tr>
          </tbody>
          </table>
          </body>
          </html>
          `
      }

  //Juntando as 3 partes
  conteudo = conteudoInicio + conteudoMeio

  // Incluindo o conteudo no html
  fs.writeFileSync("cardapioCategoriaWeb.html", conteudo);

  // Finalizando o Processo
  console.log(
    `\n✅ Cardápio gerado com sucesso\nAcesse aqui: file:///C:/Users/gabri/Documents/GitHub/programa-lancheria/cardapioCategoriaWeb.html`
  );
}

function alterarProduto() {

  // TÍTULO da Secção
  console.log('\n'+"-".repeat(83) + "\n💱 Alterar Nome de Produto\n" + "-".repeat(83) + "\n")

  // Exibe a TABELA de Produtos e Preços
  console.log(`\nID..: Produto............:\n`)
  for (let i in nomes) {
    let aux = Number(i)+1
    console.log(`${String(aux).padEnd(5)} ${nomes[i].padEnd(20)}`);
  }

  // ENTRADA do índice do produto à alterar
  let prod = Number(prompt("\n🔹 Informe o 'ID' do Produto: "))
  
  // Verifica se a ENTRADA É UM NÚMERO VÁLIDO
  if (isNaN(prod) || prod < 1 || prod > nomes.length) {
    console.log("\n🔶 Ops... O índice do produto informado não existe.")
  } else {
    prod-=1
    const nomeAntigo = nomes[prod]
    console.log(`   ${nomes[prod].padEnd(26)}`)
    do{
    novoNome = prompt("🔹 Infome o Novo Nome: ")
    } while(isNaN(novoNome)== false)
    nomes[prod] = novoNome
  
    console.log(`\n✅ Produto ${nomeAntigo} foi ALTERADO para ${(novoNome)}.`)
    
    gravaProdutos();
  }
}

function alterarCategoria() {

  // TÍTULO da Secção
  console.log('\n'+"-".repeat(83) + "\n🛒 Alterar Categoria de Produto\n" + "-".repeat(83) + "\n")

  // Exibe a TABELA de Produtos e Preços
  console.log(`\nID..: Produto............: Categoria: \n`)
  for (let i in nomes) {
    let aux = Number(i)+1
    console.log(`${String(aux).padEnd(5)} ${nomes[i].padEnd(20)} ${categorias[i].padEnd(10)}`);
  }

  // ENTRADA do índice do produto à alterar
  let prod = Number(prompt("\n🔹 Informe o 'ID' do Produto: "))
  
  // Verifica se a ENTRADA É UM NÚMERO VÁLIDO
  if (isNaN(prod) || prod < 1 || prod > nomes.length) {
    console.log("\n🔶 Ops... O índice do produto informado não existe.")
  } else {
    prod-=1
    const infoAntigo = categorias[prod]
    console.log(`   ${nomes[prod].padEnd(26)} ${categorias[prod].padEnd(10)}`)
    do{
    novoNome = prompt("🔹 Infome a Nova Categoria:   ").toUpperCase()
    } while(isNaN(novoNome)== false)
    categorias[prod] = novoNome
  
    console.log(`\n✅ A Categoria ${infoAntigo} do Produto ${nomes[prod]} foi ALTERADA para ${(novoNome)}.`)
    
    gravaProdutos();
  }
}

function alterarIgredientes() {

  // TÍTULO da Secção
  console.log('\n'+"-".repeat(83) + "\n🥗 Alterar Igredientes de Produto\n" + "-".repeat(83) + "\n")

  // Exibe a TABELA de Produtos e Preços
  console.log(`\nID..: Produto............: Igredientes............................: \n`)
  for (let i in nomes) {
    let aux = Number(i)+1
    console.log(`${String(aux).padEnd(5)} ${nomes[i].padEnd(20)} ${igredientes[i].padEnd(40)}`);
  }

  // ENTRADA do índice do produto à alterar
  let prod = Number(prompt("\n🔹 Informe o 'ID' do Produto: "))
  
  // Verifica se a ENTRADA É UM NÚMERO VÁLIDO
  if (isNaN(prod) || prod < 1 || prod > nomes.length) {
    console.log("\n🔶 Ops... O índice do produto informado não existe.")
  } else {
    prod-=1
    const infoAntigo = igredientes[prod]
    console.log(`   ${nomes[prod].padEnd(28)} ${igredientes[prod].padEnd(40)}`)
    do{
    novoNome = prompt("🔹 Infome os Novos Igredientes: ")
    } while(isNaN(novoNome)== false)
    igredientes[prod] = novoNome
  
    console.log(`\n✅ Os igredientes "${infoAntigo}" do Produto ${nomes[prod]} \nforam ALTERADOS para "${(novoNome)}".`)
    
    gravaProdutos();
  }
}

function alterarPreco() {

  // TÍTULO da Secção
  console.log('\n'+"-".repeat(83) + "\n💱 Alterar Preço de Produto\n" + "-".repeat(83) + "\n")

  // Exibe a TABELA de Produtos e Preços
  console.log(`\nID..: Produto............: Preço....:\n`)
  for (let i in nomes) {
    let aux = Number(i)+1
    console.log(`${String(aux).padEnd(5)} ${nomes[i].padEnd(20)} R$${String(Number(precos[i]).toFixed(2)).padStart(8)}`);
  }

  // ENTRADA do índice do produto à alterar
  let prod = Number(prompt("\n🔹 Informe o 'ID' do Produto: "))
  
  // Verifica se a ENTRADA É UM NÚMERO VÁLIDO
  if (isNaN(prod) || prod < 1 || prod > nomes.length) {
    console.log("\n🔶 Ops... O índice do produto informado não existe.")
  } else {
    prod-=1
    console.log(`   ${nomes[prod].padEnd(26)} R$ ${Number(precos[prod]).toFixed(2)}`)
    do{
    novoPreco = Number(prompt("🔹 Infome o Novo Preço:       R$ "))
    } while(isNaN(novoPreco))
    precos[prod] = novoPreco
  
    console.log(`\n✅ O preço do produto ${nomes[prod]} foi ALTERADO para R$ ${(novoPreco.toFixed(2))}.`)
    
    gravaProdutos();
  }
}

function exclusao() {
  // TÍTULO da Secção
  console.log("-".repeat(83) + "\n❌ Excluir Produto\n" + "-".repeat(83) + "\n")

  // Exibe a TABELA de Produtos e Preços
  console.log(`\nProduto............:\n`
      )
  for (let i in nomes) {
    console.log(`${Number(i)+1} ${nomes[i].padEnd(20)}`);
  }

  // ENTRADA do índice do produto à alterar
  let prod = Number(prompt("\n🔹 Nº do Produto: "))
  
  // Verifica se a ENTRADA É UM NÚMERO VÁLIDO
  if (prod < 1 || prod > nomes.length || isNaN(prod)) {
    console.log("\n🔶 Ops... O índice do produto informado não existe.")
  } else {
    prod-=1
    let antigoProduto = nomes[prod]
    // Excluindo itens (método SPLICE)
    nomes.splice(prod,1)
    categorias.splice(prod,1)
    igredientes.splice(prod,1)
    precos.splice(prod,1)
    fotos.splice(prod,1)

    // Info de Exclusão e Salva Produtos
    console.log(`\n❌ Este produto EXCLUÍDO foi excluído.`)
    gravaProdutos();
  }
}

function gravaProdutos() {
  const produtos = [];

  for (i in nomes) {
    produtos.push(
      nomes[i] +
        ";" +
        categorias[i] +
        ";" +
        igredientes[i] +
        ";" +
        precos[i] +
        ";" +
        fotos[i]
    );
  }

  //Salvar dados do Vetor
  fs.writeFileSync("produtos.txt", produtos.join("\n"));
  console.log(`\n🔹 Volte Sempre!\n`);
}

function obtemProdutos() {
  if (fs.existsSync("produtos.txt")) {
    // SE produtos.txt existir ENTÃO...

    // Lê as linhas do .txt e fatia e separando as linhas (\n)
    const produtos = fs.readFileSync("produtos.txt", "utf-8").split("\n");

    // Separa e manda pros vetores
    for (i in produtos) {
      const partes = produtos[i].split(";");

      nomes.push(partes[0]);
      categorias.push(partes[1]);
      igredientes.push(partes[2]);
      precos.push(Number(partes[3]));
      fotos.push(partes[4]);
    }
  }
}

// Carregar lista de produtos antes do Menu (se existir arquivo)
obtemProdutos();
//---------------------------------- PROGRAMA PRINCIPAL ---------------------------------------

menuPrincipal: 
do {
  console.log(
    "\n"+"-".repeat(83) +
      "\n🍔 LANCHERIA AVENIDA - CONTROLE DE CARDÁPIO\n" +
      "-".repeat(83)
  );
  console.log("\n1. 📝 Inclusão de Produtos");
  console.log("2. 📋 Listagem de Produtos");
  console.log("3. 🔍 Pesquisa por Categoria");
  console.log("4. 🔎 Pesquisa por Intervalo de Preço");
  console.log("5. 📖 Gerar Cardápio Web");
  console.log("6. 🌐 Gerar Cardápio Web por Categoria");
  console.log("7. 🔡 Alterar Nome de Produto");
  console.log("8. 🛒 Alterar Categoria de Produto");
  console.log("9. 🥗 Alterar Igredientes de Produto");
  console.log("10.💱 Alterar Preço de Produto");
  console.log("11.❌ Excluir Produto");
  console.log("12.↩️ Finalizar");
  const opcao = Number(prompt("\n🔸 Opção: "));

  switch (opcao) {
    case 1: {
      inclusao();
      break;
    }
    case 2: {
      listagem();
      break;
    }
    case 3: {
      pesquisaCategoria();
      break;
    }
    case 4: {
      pesquisaPreco();
      break;
    }
    case 5: {
      cardapioWeb();
      break;
    }
    case 6: {
      CardapioporCategoria();
      break;
    }
    case 7: {
      alterarProduto();
      break;
    }
        case 8: {
      alterarCategoria();
      break;
    }    case 9: {
      alterarIgredientes();
      break;
    }
    case 10: {
      alterarPreco();
      break;
    }
    case 11: {
      exclusao();
      break;
    }
    default: {
      break menuPrincipal;
    }
  }
} while (true);

// Chamar função gravaProdutos(), assim que o programa finalizar
gravaProdutos();
