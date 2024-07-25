# Web - Controle de Produtos

## Proposta
Desenvolver um sistema de gerenciamento de lista de produtos.
Deve ser criado uma API rest e o frontend para consumir esta API.

### Descrição do Projeto
O projeto consiste em desenvolver um sistema de gerenciamento de lista de produtos. O objetivo é permitir que os usuários possam adicionar, visualizar, atualizar e excluir produtos da lista.
Além disso, o sistema deve fornecer recursos como filtros de pesquisa e ordenação dos produtos.

### Funcionalidades Requeridas
1. Cadastrar Produto
    - Os usuários devem poder adicionar um novo produto à lista.
    - Os campos do formulário de adição devem incluir nome do produto, descrição, preço, categoria e imagem opcional.

2. Cadastrar Categoria
    - Fazer um CRUD para categoria, que será vinculado ao produto.

3. Visualizar Lista de Produtos
    - A página inicial deve exibir a lista de produtos existentes.
    - Para cada produto, deve ser exibido o nome, preço e categoria.
    - Os usuários devem ser capazes de clicar em um produto para ver mais detalhes.

4. Detalhes do Produto
    - Ao visualizar os detalhes de um produto, todas as informações, incluindo a descrição e a imagem, devem ser exibidas.
    - Os usuários devem ter a opção de retornar à lista de produtos.

5. Atualizar Produto
    - Os usuários devem ter a capacidade de editar as informações de um produto existente.
    - Eles devem poder modificar qualquer campo do produto, incluindo nome, descrição, preço, categoria e imagem.

6. Excluir Produto
    - Os usuários devem poder remover um produto da lista.
    - Ao confirmar a exclusão, o produto deve ser removido permanentemente da lista.

### Bônus
1. Pesquisa e Filtros
    - Os usuários devem ter a opção de pesquisar produtos por nome e categoria.
    - Implemente um campo de pesquisa onde os usuários possam digitar palavras-chave para filtrar a lista de produtos exibidos.
  
2. Ordenação dos Produtos
    - Os usuários devem poder ordenar a lista de produtos por nome, preço ou categoria, em ordem crescente ou decrescente.
