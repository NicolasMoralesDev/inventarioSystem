package com.nicolasMorales.InventariumSystem.services;

import com.nicolasMorales.InventariumSystem.entity.Role;

import java.util.List;
import java.util.Optional;

/**
 *  @author Nicolas Morales.
 *  Interfaz para los servicios de Roles.
 */
public interface IRoleService {
    List findAll();
    Optional findById(Long id);
    Role save(Role role);
    void deleteById(Long id);
    Role update(Role role);
}