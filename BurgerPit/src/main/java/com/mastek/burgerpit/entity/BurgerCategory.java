package com.mastek.burgerpit.entity;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;



@Entity
@Table(name="category")

public class BurgerCategory {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="category_name")
	private String categoryName;
	
	@OneToMany(cascade=CascadeType.ALL, mappedBy="category")
	private Set<Burger> burger;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public Set<Burger> getBurger() {
		return burger;
	}

	public void setBook(Set<Burger> burger) {
		this.burger = burger;
	}

	@Override
	public String toString() {
		return "BurgerCategory [id=" + id + ", categoryName=" + categoryName + ", burger=" + burger + "]";
	}
	
	//add setters and getters
	
	//if you are not using lombok
	
}
