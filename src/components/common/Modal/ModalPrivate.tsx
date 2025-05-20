'use client';
import ModalWrapper from '@/components/common/Modal/ModalWrapper';
import { useRouter } from 'next/navigation';

interface Props {
    view: React.ReactNode;
}
export default function ModalPrivate(props: Props) {
    const router = useRouter();
    return (
        <ModalWrapper isOpen={true} onClose={() => router.back()}>
            {props.view}
        </ModalWrapper>
    );
}
