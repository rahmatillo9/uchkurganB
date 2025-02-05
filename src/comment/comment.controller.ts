import { Controller, Post, Get, Put, Delete, Param, Body } from "@nestjs/common";
import { CommentService } from "./comment.service";

@Controller("comments")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

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

  @Put(":id")
  async update(@Param("id") id: string, @Body() body: { content: string }) {
    return this.commentService.update(parseInt(id), body.content);
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.commentService.delete(parseInt(id));
  }
}
