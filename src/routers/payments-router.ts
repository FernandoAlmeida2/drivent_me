<<<<<<< HEAD
import { getPaymentByTicketId, postPayment } from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import { paymentSchema } from '@/schemas';
import { Router } from 'express';
=======
import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getPaymentByTicketId, paymentProcess } from "@/controllers";
>>>>>>> 6146a32e37cdc6604449613bf54b8daaf83717bb

const paymentsRouter = Router();

paymentsRouter
<<<<<<< HEAD
  .all('/*', authenticateToken)
  .get('/', getPaymentByTicketId)
  .post('/process', validateBody(paymentSchema), postPayment);
=======
  .all("/*", authenticateToken)
  .get("/", getPaymentByTicketId)
  .post("/process", paymentProcess);
>>>>>>> 6146a32e37cdc6604449613bf54b8daaf83717bb

export { paymentsRouter };
