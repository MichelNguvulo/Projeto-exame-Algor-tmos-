Adicione e pesquise nós em uma árvore binária com uma visualização baseada na web, fácil de usar.

Inspirado pelo Desafio de Visualização de Árvore Binária do Coding Train.
O que é uma Árvore Binária

Uma árvore binária é um tipo de estrutura de dados onde cada nó pode ter no máximo dois filhos. O nó à esquerda de qualquer nó pai deve conter um valor menor que o valor do nó pai, e o nó à direita deve conter um valor maior que o valor do nó pai.

Exemplo de Árvore Binária

Para mais informações, veja esta explicação da Universidade Carnegie Mellon.
Usando a Visualização

Quando a visualização é aberta pela primeira vez, a tela estará vazia.

Visualização em branco

Para adicionar um nó à árvore, clique no botão Adicionar e insira um número inteiro para o novo nó. Veja a animação adicionando o nó à árvore. Neste caso, o verde representa o nó que acabou de ser adicionado. Para mover a visualização, clique e arraste. Para dar zoom na visualização, role para cima ou para baixo.

Nó único

Clique no botão Adicionar algumas vezes para adicionar mais nós à árvore e veja as inserções sendo animadas. Para acelerar a animação, mova o controle deslizante Velocidade da Animação mais para a direita. Azul representa os nós que devem ser visitados para inserir o nó na localização correta.

Vários nós

Para assistir a árvore binária procurar um valor em si mesma, clique no botão Buscar e insira um número inteiro que você inseriu anteriormente na árvore. Azul representa os nós que devem ser visitados para encontrar o valor, vermelho representa seções da árvore onde o valor não será encontrado, e verde representa o nó que está sendo buscado. Note que se nenhum nó estiver verde, o valor não foi encontrado.

Exemplo de busca

Para limpar toda a árvore, clique no botão Limpar. Isso fará com que sua tela apareça como estava quando a visualização foi aberta pela primeira vez.

Em vez de adicionar nós manualmente, você pode preencher toda a árvore com um determinado número de nós. Para fazer isso, clique no botão Preencher, insira o número desejado de nós no prompt e veja os nós sendo adicionados um de cada vez. Nota: isso limpa a árvore atual.

Se você não quiser esperar pela animação de inserção, clique no botão Preenchimento Rápido, que funciona da mesma forma que o botão Preencher, mas não anima o processo de inserção. Nota: isso também limpa a árvore atual.

Exemplo de preenchimento
Estrutura do Código

    Node.js - Define a classe Node, o bloco de construção da árvore binária. Os nós armazenam seu valor, referências para ambos os filhos e informações para desenhá-los na tela (por exemplo, coordenadas x e y, cores, etc.).
    Tree.js - Define a classe Tree, que serve tanto como um invólucro para o nó raiz da árvore binária (por exemplo, fornecendo funções para buscar valores na árvore), quanto como a classe principal responsável por animar a árvore binária.
    Controls.js - Define a classe Controls, que conecta os botões (por exemplo, Limpar, Preenchimento Rápido, etc.) às funções de animação da classe Tree.
    Explorer.js - Define a classe Explorer, que ajusta o tamanho e a posição da árvore para permitir a navegação e o zoom sobre toda a árvore.
    sketch.js - Instancia todos os objetos necessários para rodar a visualização.

Veja cada arquivo para uma documentação mais detalhada e explicações aprofundadas de como cada classe funciona.
Construído com

    p5.js - Uma biblioteca para criar visualizações usando o canvas.

Ideias Futuras

   

