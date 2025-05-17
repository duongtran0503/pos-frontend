import MenuBar from '@/components/features/MenuBar/Menubar';
import ProductSection from '@/components/features/ProductSection/ProductSection';
import Wrapper from '@/components/layout/Wrapper';
import { CategoryTypeEnum } from '@/constans/category';
import { ProductTypeEnum } from '@/constans/product';
import { Box } from '@mui/material';

export default function Home() {
    return (
        <Box>
            <MenuBar typeCategory={CategoryTypeEnum.FOOD} />
            <Wrapper>
                <Box>
                    <ProductSection typeProduct={ProductTypeEnum.FOOD} />
                </Box>
            </Wrapper>
        </Box>
    );
}
