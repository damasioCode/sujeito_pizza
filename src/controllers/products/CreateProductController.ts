import { Request, Response } from "express";
import { CreateProductService } from "../../services/products/CreateProductService";

class CreateProductController {
    async handle(request: Request, response: Response) {
       
        let banner = ''; 

        const { 
            name, 
            price, 
            description, 
            category_id
        } = request.body;
        
        const createProductService = new CreateProductService();

        const product = await createProductService.execute({ 
            name, 
            price, 
            description, 
            banner, 
            category_id
        })

        return response.json(product);
    }
}

export { CreateProductController }