## Entidades

1. Produto
   • ID único
   • Nome
   • Tamanho
   • Cor
   • Quantidade em estoque
   • Quantidade mínima em estoque

2. Movimentação de Estoque
   • ID do produto
   • Data da movimentação
   • Tipo de movimentação (entrada/saída)
   • Quantidade

3. Venda
   • ID do produto
   • Data da venda
   • Quantidade vendida
   • Lucro gerado

4. Alerta
   • ID do produto
   • Tipo de alerta (estoque baixo)
   • Método de notificação (e-mail, sistema)

5. Ordem de Compra
   • ID do produto
   • Quantidade solicitada
   • Data da ordem
   • Status da ordem

6. Fornecedor
   • Nome do fornecedor
   • Informações de contato
   • Prazos de entrega

## Casos de Uso

1. Criar Produto
   • Atribuir ID único a cada produto
   • Adicionar informações extras (nome, tamanho, cor, quantidade em estoque, quantidade mínima em estoque)
2. Rastrear Produto Individualmente
   • Buscar produto por ID, nome, tamanho, cor, quantidade em estoque, e quantidade mínima em estoque
   • Visualizar detalhes do produto e suas movimentações de estoque
3. Definir Quantidades Mínimas de Estoque
   • Definir limite mínimo para cada produto
   • Receber alertas quando o estoque estiver baixo
4. Receber Alertas de Estoque Baixo
   • Configurar métodos de notificação (e-mail, sistema)
   • Enviar alertas quando o estoque atingir o limite mínimo
5. Visualizar Histórico de Vendas e Estoque
   • Exibir quantidade de produtos vendidos em um período
   • Mostrar lucro gerado por produto
   • Identificar produtos mais vendidos
   • Analisar tendências de estoque ao longo do tempo
6. Gerenciar Ordens de Compra
   • Criar ordens de compra automaticamente com base nas quantidades mínimas de estoque
   • Atualizar status das ordens de compra
   • Integrar com fornecedores para receber atualizações sobre prazos de entrega
