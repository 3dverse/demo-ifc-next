//------------------------------------------------------------------------------
import { AccordionPanel } from "@chakra-ui/react";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const ProductsListAccordionPanel = ({ product }: { product: any }) => {
    return (
        <AccordionPanel p="0">
            <ul className="w-full py-2 px-4 text-xs text-pretty">
                <li>
                    <p className="font-medium">Dépose :</p>
                    <ul className="list-disc pl-4">
                        <li>Dépose soignée avec outils manuels standardsInformations technique.</li>
                        <li>Nécessite un pré-traitement : nettoyage / peinture / stockage.</li>
                        <li>Prévoir une protection contre les chocs.</li>
                    </ul>
                </li>
            </ul>
        </AccordionPanel>
    );
};
