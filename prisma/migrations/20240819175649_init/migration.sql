-- CreateTable
CREATE TABLE "Categoria" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(30) NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_descricao_key" ON "Categoria"("descricao");
