/*
  Warnings:

  - You are about to drop the column `product_id` on the `Product_category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product_category" DROP CONSTRAINT "Product_category_product_id_fkey";

-- AlterTable
ALTER TABLE "Product_category" DROP COLUMN "product_id";
