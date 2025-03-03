import { Controller, Post, Get, Put, Delete, Param, Body, UseGuards } from "@nestjs/common";
import { CommentService } from "./comment.service";


import { JwtAuthGuard } from "src/authguard/jwt-auth.guard";
import { Role } from "src/validators/users.validator";
import { RolesGuard } from "src/validators/RolesGuard/Roluse.guard";
import { Roles } from "src/validators/RolesGuard/Roles";



@Controller("comments")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}



  @UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin, Role.Customer)
  @Post()
  async create(@Body() body: { user_id: number; post_id: number; content: string }) {
    return this.commentService.create(body.user_id, body.post_id, body.content);
  }

  @Get()
  async findAll() {
    return this.commentService.findAll();
  }

  @Get("post/:post_id")
  async findByPost(@Param("post_id") post_id: string) {
    return this.commentService.findByPost(parseInt(post_id));
  }

  @Get("user/:user_id")
  async findByUser(@Param("user_id") user_id: string) {
    return this.commentService.findByUser(parseInt(user_id));
  }


  @UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin, Role.Customer)
  @Put(":id")
  async update(@Param("id") id: string, @Body() body: { content: string }) {
    return this.commentService.update(parseInt(id), body.content);
  }


  @UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin, Role.Customer)
  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.commentService.delete(parseInt(id));
  }
}
