import express from 'express';

const app=express();

app.use(express.urlencoded({extended: true}))
const porta = 3000;
const host = '0.0.0.0';

var listamaterial=[];

function pedidomaterial(req,res){
res.send(`
        <html>
        <head>
            <title>Cadastro material</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

        </head>
        <body>
            <div>
                <h1> Cadastro de Materiais</h1>
                <form method="POST" action="/pedirmaterial" novalidate>
                    <div>
                        <label for="solicitante">Nome do Solicitante: </label>
                        <input type="text" id="sol" name ="sol" required>
                    </div>
                    <div>
                        <label for="setor">Nome do Setor: </label>
                        <input type="text" id="setor" name ="setor" required>
                    </div>
                    <div>
                        <label for="material">Material: </label>
                        <input type="text" id="material" name="material" required>
                    </div>
                    <div>
                        <label for="quantidade">Quantidade: </label>
                        <input type="number" id="qtd" name="qtd" required>
                    </div>
                    <div>
                        <label for="tipo">Tipo de Uso: </label>
                        <select id="tipo" name="tipo" required>
                            <option selected disabled value="">Onde sera utilizado</option>
                            <option value="SA">Sala de aula</option>
                            <option value="ES">Escritorio</option>
                        </select>
                    </div>
                    <div class="col-12">
                        <button class="btn btn-primary" type="submit">Cadastrar pedido</button>
                    </div>
                </form>
            </div>
        </body>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </html>
    `);
}

function cadmaterial(req,res){
    const sol = req.body.sol;
    const setor = req.body.setor;
    const material = req.body.material;
    const qtd = req.body.qtd;
    const tipo = req.body.tipo;

    const pedido = {sol, setor, material, qtd, tipo};
    listamaterial.push(pedido);

    res.write(`
        <html>
            <head>
                <title> Lista de solicitação </title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                <meta charset="utf-8">
            </head>
            <body>
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Solicitante </th>
                            <th scope="col">Setor </th>
                            <th scope="col">Material </th>
                            <th scope="col">Quantidade </th>
                            <th scope="col">Tipo de uso </th>
                        </tr>
                    </thead>
                    <tbody>`);
                    for (var i=0; i< listamaterial.length;i++){
                        res.write(`<tr>
                                        <td>${listamaterial[i].sol} </td>
                                        <td>${listamaterial[i].setor} </td>
                                        <td>${listamaterial[i].material} </td>
                                        <td>${listamaterial[i].qtd} </td>
                                        <td>${listamaterial[i].tipo} </td>
                                    </tr>
                        `)
                    }
    res.write(`
                    </tbody>
                </table>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </html>
        `);
    res.end();
}

app.get('/pedirmaterial', pedidomaterial);
app.post('/pedirmaterial', cadmaterial);


app.listen(porta, host,()=>{
    console.log('Servidor iniciado.');
});

