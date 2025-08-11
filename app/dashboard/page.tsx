import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase/adminApp";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartColumn, Clock, FolderOpen, History, SquareCheckBig, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) {
    redirect("/");
  }

  try {
    // const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
    return <>
      {/* <h1>Bem-vindo {decodedClaims.email}</h1> */}
      {/* <Link href="/dashboard/profile">Profile</Link> */}

      <h1 className="font-medium text-2xl mb-1">Dashboard</h1>
      <p className="text-sm text-muted-foreground">Visão geral dos seus projetos e tarefas</p>
      <div className="grid grid-cols-4 gap-6 my-6">
        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Projetos Ativos</p>
              <p className="text-xl font-medium">2</p>
            </div>
            <div className="p-2.5 bg-input dark:bg-secondary rounded-md">
              <FolderOpen className="text-secondary-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tarefas Concluídas</p>
              <p className="text-xl font-medium">12</p>
            </div>
            <div className="p-2.5 bg-input dark:bg-secondary rounded-md">
              <SquareCheckBig className="text-secondary-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Prazos Atrasados</p>
              <p className="text-xl font-medium">3</p>
            </div>
            <div className="p-2.5 bg-input dark:bg-secondary rounded-md">
              <Clock className="text-secondary-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Membros Ativos</p>
              <p className="text-xl font-medium">8</p>
            </div>
            <div className="p-2.5 bg-input dark:bg-secondary rounded-md">
              <Users className="text-secondary-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-md">
              <ChartColumn size={20} /> 
              Distribuição de Tarefas
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex justify-between">
              <p>A fazer</p>
              <div className="flex items-center w-full max-w-[200px] gap-4">
                <Progress value={33}  />
                <span className="font-medium">2</span>
              </div>
            </div>
            <div className="flex justify-between">
              <p>Em Progresso</p>
              <div className="flex items-center w-full max-w-[200px] gap-4">
                <Progress value={60}  />
                <span className="font-medium">2</span>
              </div>
            </div>
            <div className="flex justify-between">
              <p>Concluída</p>
              <div className="flex items-center w-full max-w-[200px] gap-4">
                <Progress value={20}  />
                <span className="font-medium">2</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-md">
              <History size={20} /> 
              Últimos Projetos Atualizados
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Card className="flex flex-row justify-between py-4">
              <CardHeader className="w-full">
                <CardTitle>
                  Sistema de E-commerce
                </CardTitle>
                <CardDescription className="font-medium">
                  Entrega: 14/12/2024
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center gap-2">
                <Badge variant={"active"}>Ativo</Badge>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </CardContent>
            </Card>
            <Card className="flex flex-row justify-between py-4">
              <CardHeader className="w-full">
                <CardTitle>
                  App Mobile Financeiro
                </CardTitle>
                <CardDescription className="font-medium">
                  Entrega: 29/10/2024
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center gap-2">
                <Badge variant={"active"}>Ativo</Badge>
                <Avatar>
                  <AvatarImage src="https://github.com/Carlos-std.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </CardContent>
            </Card>
            <Card className="flex flex-row justify-between py-4">
              <CardHeader className="w-full">
                <CardTitle>
                  Dashboard Analytics
                </CardTitle>
                <CardDescription className="font-medium">
                  Entrega: 30/07/2024
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center gap-2">
                <Badge variant={"completed"}>Concluído</Badge>
                <Avatar>
                  <AvatarImage src="https://github.com/Carlos-std.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </>;
  } catch {
    return <p>Sessão inválida. Faça login novamente.</p>;
  }
}
