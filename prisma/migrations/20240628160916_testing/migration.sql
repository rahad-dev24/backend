/*
  Warnings:

  - You are about to drop the column `product_category_id` on the `Product` table. All the data in the column will be lost.
  - The `rent_option` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `product_id` to the `Product_category` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Rent_option" AS ENUM ('Hourly', 'Daily', 'Monthly');

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_product_category_id_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "product_category_id",
DROP COLUMN "rent_option",
ADD COLUMN     "rent_option" "Rent_option" NOT NULL DEFAULT 'Daily';

-- AlterTable
ALTER TABLE "Product_category" ADD COLUMN     "product_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Product_category" ADD CONSTRAINT "Product_category_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
