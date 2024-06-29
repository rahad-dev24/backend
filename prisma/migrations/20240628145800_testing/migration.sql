/*
  Warnings:

  - You are about to drop the column `product_id` on the `Product_category` table. All the data in the column will be lost.
  - Added the required column `product_category_id` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product_category" DROP CONSTRAINT "Product_category_product_id_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "product_category_id" TEXT NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "rent_price" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Product_category" DROP COLUMN "product_id";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_product_category_id_fkey" FOREIGN KEY ("product_category_id") REFERENCES "Product_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
