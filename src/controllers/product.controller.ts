import { NextFunction, Request, Response } from 'express';

import { ProductsForSaleRequest, ProductsForSaleResponse } from '../interfaces/product.interface';
import { getProductsForSale } from '../services/product.service';
import { errorResponse, successResponse } from '../utils/response-formatter.utils';

export const productsForSale = async (
    req: Request<{}, {}, ProductsForSaleRequest>,
    res: Response,
    next: NextFunction
  ): Promise<Response<ProductsForSaleResponse> | void> => {
    try {
        const { platformId } = req.tokenData || {};
        
        if (!platformId) {
          errorResponse(res, 'Platform ID é obrigatório', 400, 'Platform ID não foi fornecido na requisição.');
          return;
        }

        // Buscar produtos pertencentes à plataforma atual
        const products = await getProductsForSale(platformId);

        // Adicionando validação para verificar se a lista de produtos está vazia
        if (products.length === 0) {
          errorResponse(res, 'Nenhum produto encontrado', 404, 'Não foram encontrados produtos para a plataforma.');
          return;
        }

        return successResponse(res, products, 'Produtos encontrados com sucesso') as Response<ProductsForSaleResponse>;
      } catch (error) {
        // Em caso de erro, passar o erro para o middleware de tratamento de erros
        next(error);
      }
  }