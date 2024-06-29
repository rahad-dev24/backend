-- CreateTable
CREATE TABLE "_ProductToProduct_category" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToProduct_category_AB_unique" ON "_ProductToProduct_category"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToProduct_category_B_index" ON "_ProductToProduct_category"("B");

-- AddForeignKey
ALTER TABLE "_ProductToProduct_category" ADD CONSTRAINT "_ProductToProduct_category_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToProduct_category" ADD CONSTRAINT "_ProductToProduct_category_B_fkey" FOREIGN KEY ("B") REFERENCES "Product_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
