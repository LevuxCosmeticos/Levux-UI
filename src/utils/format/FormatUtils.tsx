class FormatUtils {

    formatCNPJ = (cnpj: string): string => {
        const onlyDigits = cnpj.replace(/\D/g, '');

        if (cnpj !== onlyDigits) {
            return onlyDigits;
        }

        return onlyDigits.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
    };

}

const formatUtils = new FormatUtils();
export default formatUtils;