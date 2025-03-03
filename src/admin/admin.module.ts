import { Module, OnModuleInit } from '@nestjs/common';
import {YourEntity} from "src/your.entity";
import AdminJS from "adminjs";
import {componentLoader} from "src/admin/component";
import {AdminModule as AdminJsModule} from "@adminjs/nestjs";

interface AdminUser  {
  email: string;
}

const adminjs = new AdminJS({
  componentLoader,
});


@Module({
  imports: [
    AdminJsModule.createAdminAsync({
      useFactory: (
      ) => ({
        auth: {
          authenticate: async (email, password): Promise<AdminUser> => {
            const token = password;
            return Promise.resolve({email})
          },
          cookieName: 'adminjs',
          cookiePassword: 'secret',
        },
        sessionOptions: {
          resave: false,
          saveUninitialized: true,
          secret: 'secret',
        },
        adminJsOptions: {
          rootPath: '/admin',
          assetsCDN: process.env.NODE_ENV === 'production' ? 'https://nestjs-adminjs-serverless.vercel.app/public/' : 'http://localhost:3000/public/', // 마지막에 /를 꼭 붙여야함
          settings: {
            defaultPerPage: 300,
          },
          // resources: [
          //   {
          //     resource: YourEntity,
          //     options: {
          //       listProperties: ['id', 'name', 'deleted'],
          //       editProperties: ['id', 'name', 'deleted'],
          //       showProperties: ['id', 'name', 'deleted'],
          //       properties: {
          //         id: {
          //           isRequired: true,
          //         },
          //         name: {
          //           isRequired: true,
          //         },
          //       },
          //     },
          //
          //   },
          // ]
        },
      }),
    }),
  ],
})
export class AdminModule implements OnModuleInit {
  async onModuleInit() {
    if (process.env.NODE_ENV === 'development') {
      await adminjs.watch();
    }
  }
}
