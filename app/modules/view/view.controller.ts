import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class ViewController {
  @Get()
  renderVotePage(@Res() res: Response) {
    return res.render('vote.njk', {});
  }
}
