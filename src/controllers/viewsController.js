import { Router } from "express";
import ContainerRepository from "../Daos/Repository.js";
const productsContainer = new ContainerRepository();

export const viewsApi = Router();

export const redirect = (req, res) => {
  res.redirect("/");
};

export const failRegister = (req, res) => {
  res.render("partials/register-error", {});
};

export const failLogin = (req, res) => {
  res.render("partials/login-error", {});
};
export const renderRegister = (req, res) => {
  res.render("register");
};
export const logout = (req, res) => {
  const { username } = req.user;
  req.logout(req.user, (err) => {
    if (err) return err;
    res.redirect("/");
  });
  res.render("logout", { username });
};

export const renderLogin = (req, res) => {
  res.render("login");
};

export const redirectLogin = (req, res) => {
  res.redirect("/login");
};

export const redirectProducts = async (req, res) => {
  const { title, price, thumbnail } = req.body;
  const producto = { title, price, thumbnail };
  console.log({ producto });
  await productsContainer.add({ producto });

  res.redirect("/");
};

export const renderProducts = async (req, res) => {
  const productos = await productsContainer.getAll();
  res.render("table", { products: productos });
};
