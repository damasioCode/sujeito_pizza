import prismaClient from "../../prisma";

interface CategoryRequest {
    name: string;
}

class CreateCategoryService{
    async execute({ name }: CategoryRequest) {
        try {
            if(!name) {
                throw new Error('Name invalid')
            }
            
            const category = await prismaClient.category.create({
                data: {
                    name
                },
                select: {
                    id: true,
                    name: true
                }
            })

            return category
            
        } catch(error) {
            return { message: error.message }
        }
    }
}

export { CreateCategoryService }