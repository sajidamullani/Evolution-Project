package  com.mastek.burgerpit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.mastek.burgerpit.entity.BurgerCategory;



@RepositoryRestResource(collectionResourceRel="burgerCateogry", path="burger-category")
public interface BurgerCategoryRepository extends JpaRepository<BurgerCategory, Long>{

}
