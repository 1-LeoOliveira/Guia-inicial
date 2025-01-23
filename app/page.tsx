'use client'
import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';

// Interface para definir os tipos de ferramentas/links
interface Ferramenta {
  id: string;
  nome: string;
  url: string;
  descricao?: string;
  categoria: string;
  arquivoPDF?: Array<{
    nome: string;
    arquivo: string;
  }>;
}

// Dados de exemplo com múltiplos PDFs e links internos
const ferramentas: Ferramenta[] = [
  {
    id: '1',
    nome: 'Gerenciador de IPs',
    url: 'http://10.41.13.198/phpipam/login/',
    categoria: 'Sistemas Internos',
    descricao: 'Sistema para gerencimaneto de IPs',
  },
  {
    id: '2',
    nome: 'PBX-USERS',
    url: 'https://10.91.1.41:10000/itflex-pbx-users/',
    categoria: 'Sistemas Internos',
    descricao: 'Sistema para gerenciar ramais',
  },
  {
    id: '3',
    nome: 'IMC',
    url: 'http://10.41.15.11:8080/imc/login.xhtml?reloginFlag=true',
    categoria: 'Sistemas Internos',
    descricao: 'Sistema para gerenciar as portas do switch'
  },
  {
    id: '4',
    nome: 'OPMON',
    url: 'https://opmon/opmon/seagull/modules/workspace/templates/login/index.html?initial_page=%2Fopmon%2Fseagull%2Fwww%2Findex.php%2Fopinterface%2Faction%2Fredirect%2F%3Finitial_page%3D%2Fopmon%2Fseagull%2Fwww%2Findex.php%2Fstatusgrid%2Faction%2Fservices%2F%3Ffilter%5Bsearch%5D%3D%26%26filter%255Bstatusgrid%255D%3Dservices',
    categoria: 'Sistemas Internos',
    descricao: 'Sistema para visualizar status da rede e APs'
  },
  {
    id: '5',
    nome: 'ITSM',
    url: 'https://itsm.stcruz.com.br/softexpert/workspace?page=home',
    categoria: 'Sistemas Internos',
    descricao: 'Sistema para abertura de chamados'
  },
  {
    id: '6',
    nome: 'RICOH STREAMLINE NX',
    url: 'http://10.41.13.205:8080/userconsole.html?locale=pt_BR',
    categoria: 'Sistemas Internos',
    descricao: 'Sistema para consultar / gerar novo PIN de impressão'
  },
  {
    id: '7',
    nome: 'PORTAL DE CONSULTA ',
    url: 'http://consultauser.gruposc.local:54704/impressoras/index-nf.php',
    categoria: 'Ferramentas Administrativas',
    descricao: 'Sistema para consultar HOST / IMPRESSORA / USUARIO'
  },
  {
    id: '8', 
    nome: 'INVENTÁRIO IMP. ZEBRA',
    url: 'https://santacruzdistribuidora.sharepoint.com/:x:/r/sites/DocumentosTI/Documentos%20Compartilhados/Documenta%C3%A7%C3%A3o%20Suporte%20local/Inventarios%20e%20descartes/inventario%20impressoras%20Zebra%20e%20Laser%202025.xlsx?d=waa09140063d846eb963e0e085532c8d2&csf=1&web=1&e=LVBUaZ',
    categoria: 'Ferramentas Administrativas',
    descricao: 'Controle de equipamento zebra',
  },
  {
    id: '9',
    nome: 'QRcod  PARA COLETOR',
    url: '',
    categoria: 'Ferramentas Administrativas',
    arquivoPDF: [
      { nome: '', arquivo: '/pdfs/QRcod Coletores.pdf' }
    ],
    descricao: 'QRcod para coletor 60k 61K ZEBRA'
  },
];

export default function PortalFerramentas() {
  const ferramentasPorCategoria = ferramentas.reduce((acc, ferramenta) => {
    if (!acc[ferramenta.categoria]) {
      acc[ferramenta.categoria] = [];
    }
    acc[ferramenta.categoria].push(ferramenta);
    return acc;
  }, {} as Record<string, Ferramenta[]>);

  return (
    <div className="bg-blue-50 min-h-screen">
      <Head>
        <title>Portal de Ferramentas - Suporte Local</title>
      </Head>
      
      {/* Logo Centralizado */}
      <div className="flex justify-center py-6">
        <Image 
          src="/logo.png" 
          alt="Logo da Empresa" 
          width={300} 
          height={100} 
          className="object-contain"
        />
      </div>

      <div className="container mx-auto px-4 pb-8">
        <h1 className="text-3xl font-bold mb-6 text-black text-center">Portal de Ferramentas</h1>
        
        {Object.entries(ferramentasPorCategoria).map(([categoria, ferramentasCategoria]) => (
          <div key={categoria} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">{categoria}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ferramentasCategoria.map((ferramenta) => (
                <div 
                  key={ferramenta.id} 
                  className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow flex flex-col border-l-4 border-blue-200"
                >
                  <h3 className="text-xl font-medium mb-2 text-blue-800">{ferramenta.nome}</h3>
                  <p className="text-blue-600 mb-3 flex-grow">{ferramenta.descricao}</p>
                  
                  <div className="flex flex-col space-y-2">
                    {ferramenta.url && (
                      <Link 
                        href={ferramenta.url} 
                        target="_blank" 
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-center"
                      >
                        Acessar
                      </Link>
                    )}
                    
                    {ferramenta.arquivoPDF && ferramenta.arquivoPDF.map((pdf, index) => (
                      <Link 
                        key={index}
                        href={pdf.arquivo} 
                        target="_blank" 
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-center"
                      >
                        PDF {pdf.nome}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}