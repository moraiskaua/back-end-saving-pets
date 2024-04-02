-- CreateEnum
CREATE TYPE "TypeOfStatus" AS ENUM ('EM_ABERTO', 'EM_ANDAMENTO', 'ATENDIDO');

-- AlterTable
ALTER TABLE "reports" ADD COLUMN     "status" "TypeOfStatus" NOT NULL DEFAULT 'EM_ABERTO';
