/*
  Warnings:

  - A unique constraint covering the columns `[block_name]` on the table `Block` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Block_block_name_key" ON "Block"("block_name");
