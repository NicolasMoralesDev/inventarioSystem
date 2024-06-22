package com.nicolasMorales.IncomeService.dtos;

import com.nicolasMorales.IncomeService.models.Product;
import jakarta.annotation.Nullable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author Nicolas Morales.
 * DTO para editar los registros de ingresos.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class IncomeDTO {

    private String observacion;
    private String provedor;
    private List <ProductDTO> productos;
    @Nullable
    private String fechaIngreso;

}
