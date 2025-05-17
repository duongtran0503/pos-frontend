import MenuBar from '@/components/features/MenuBar/Menubar';
import ProductSection from '@/components/features/ProductSection/ProductSection';
import Wrapper from '@/components/layout/Wrapper';
import { CategoryTypeEnum } from '@/constans/category';
import { ProductTypeEnum } from '@/constans/product';
import { Box } from '@mui/material';
interface Props {
    params: Promise<{ slug: string }>;
}
export default async function Page({ params }: Props) {
    const slug = (await params).slug;
    return (
        <Box>
            <MenuBar typeCategory={slug as CategoryTypeEnum} />
            <Wrapper>
                <Box>
                    <ProductSection typeProduct={slug as ProductTypeEnum} />
                </Box>
            </Wrapper>
        </Box>
    );
}
