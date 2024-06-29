/*
  Warnings:

  - The primary key for the `Product_category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Product_category` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Product_category` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Product_category` table. All the data in the column will be lost.
  - You are about to drop the `_ProductToProduct_category` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[category_id,product_id]` on the table `Product_category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `product_id` to the `Product_category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ProductToProduct_category" DROP CONSTRAINT "_ProductToProduct_category_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToProduct_category" DROP CONSTRAINT "_ProductToProduct_category_B_fkey";

-- AlterTable
ALTER TABLE "Product_category" DROP CONSTRAINT "Product_category_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "updatedAt",
ADD COLUMN     "product_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "_ProductToProduct_category";

-- CreateIndex
CREATE UNIQUE INDEX "Product_category_category_id_product_id_key" ON "Product_category"("category_id", "product_id");

-- AddForeignKey
ALTER TABLE "Product_category" ADD CONSTRAINT "Product_category_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
