-- CreateTable
CREATE TABLE "Produto" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(30) NOT NULL,
    "descricao" VARCHAR(100) NOT NULL,
    "preco" MONEY NOT NULL,
    "imagem" VARCHAR(100),
    "categoriaProduto" INTEGER NOT NULL,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Produto_nome_key" ON "Produto"("nome");

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_categoriaProduto_fkey" FOREIGN KEY ("categoriaProduto") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
