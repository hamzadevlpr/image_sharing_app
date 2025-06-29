'use client'
import { useState } from "react";
import { CheckCircle, AlertCircle, XCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SystemComponent {
    name: string;
    status: 'operational' | 'degraded' | 'outage';
    uptime: string;
}

interface Incident {
    id: string;
    title: string;
    status: 'resolved' | 'investigating' | 'monitoring';
    date: string;
    time: string;
    description: string;
}

const Status = () => {
    const [overallStatus] = useState<'operational' | 'degraded' | 'outage'>('operational');

    const [systemComponents] = useState<SystemComponent[]>([
        { name: 'Website', status: 'operational', uptime: '99.99%' },
        { name: 'API', status: 'operational', uptime: '99.97%' },
        { name: 'File Upload', status: 'operational', uptime: '99.95%' },
        { name: 'File Download', status: 'operational', uptime: '99.98%' },
        { name: 'Integrations', status: 'operational', uptime: '99.96%' },
    ]);

    const [incidents] = useState<Incident[]>([
        {
            id: '1',
            title: 'Brief API latency increase',
            status: 'resolved',
            date: '29 June 2025',
            time: '14:30 UTC',
            description: 'Users experienced slightly slower API response times. Issue resolved within 15 minutes.'
        },
        {
            id: '2',
            title: 'Scheduled maintenance - File processing',
            status: 'resolved',
            date: '28 June 2025',
            time: '02:00 UTC',
            description: 'Planned maintenance to improve file processing performance. No user impact.'
        }
    ]);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'operational':
                return <CheckCircle className="h-5 w-5 text-green-500" />;
            case 'degraded':
                return <AlertCircle className="h-5 w-5 text-orange-500" />;
            case 'outage':
                return <XCircle className="h-5 w-5 text-red-500" />;
            default:
                return <Clock className="h-5 w-5 text-gray-500" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'operational':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'degraded':
                return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'outage':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getIncidentStatusColor = (status: string) => {
        switch (status) {
            case 'resolved':
                return 'bg-green-100 text-green-800';
            case 'investigating':
                return 'bg-orange-100 text-orange-800';
            case 'monitoring':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
            <main className="pt-20 pb-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    {/* Status Banner */}
                    <div className="text-center mb-12">
                        <div className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl shadow-lg mb-6 ${overallStatus === 'operational'
                            ? 'bg-green-50 border-2 border-green-200'
                            : overallStatus === 'degraded'
                                ? 'bg-orange-50 border-2 border-orange-200'
                                : 'bg-red-50 border-2 border-red-200'
                            }`}>
                            {getStatusIcon(overallStatus)}
                            <h1 className={`text-2xl font-bold ${overallStatus === 'operational'
                                ? 'text-green-800'
                                : overallStatus === 'degraded'
                                    ? 'text-orange-800'
                                    : 'text-red-800'
                                }`}>
                                {overallStatus === 'operational' ? 'All Systems Operational' :
                                    overallStatus === 'degraded' ? 'Some Systems Degraded' :
                                        'System Outage'}
                            </h1>
                        </div>
                        <p className="text-gray-600 text-lg">
                            Last updated: {new Date().toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })} at {new Date().toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                                timeZoneName: 'short'
                            })}
                        </p>
                    </div>

                    {/* System Components */}
                    <Card className="mb-12 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-2xl text-gray-800">System Status</CardTitle>
                            <p className="text-gray-600">Current status of all PicShare services</p>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {systemComponents.map((component) => (
                                    <div key={component.name} className="flex items-center justify-between p-4 rounded-xl bg-gray-50/50 hover:bg-gray-100/50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            {getStatusIcon(component.status)}
                                            <div>
                                                <h3 className="font-semibold text-gray-800">{component.name}</h3>
                                                <p className="text-sm text-gray-600">30-day uptime: {component.uptime}</p>
                                            </div>
                                        </div>
                                        <Badge
                                            variant="outline"
                                            className={`${getStatusColor(component.status)} capitalize font-medium`}
                                        >
                                            {component.status}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Incident History */}
                    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-2xl text-gray-800">Recent Incidents</CardTitle>
                            <p className="text-gray-600">Latest updates and resolved issues</p>
                        </CardHeader>
                        <CardContent>
                            {incidents.length === 0 ? (
                                <div className="text-center py-12">
                                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                                    <p className="text-gray-600 text-lg">No recent incidents to report</p>
                                    <p className="text-gray-500">All systems have been running smoothly</p>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {incidents.map((incident) => (
                                        <div key={incident.id} className="border-l-4 border-teal-200 pl-6 pb-6 last:pb-0">
                                            <div className="flex items-start justify-between mb-2">
                                                <h3 className="font-semibold text-gray-800 text-lg">{incident.title}</h3>
                                                <Badge
                                                    variant="outline"
                                                    className={`${getIncidentStatusColor(incident.status)} capitalize font-medium ml-4`}
                                                >
                                                    {incident.status}
                                                </Badge>
                                            </div>
                                            <p className="text-gray-600 mb-3">{incident.description}</p>
                                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-4 w-4" />
                                                    {incident.date}
                                                </span>
                                                <span>{incident.time}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Additional Info */}
                    <div className="mt-12 text-center">
                        <p className="text-gray-600 mb-4">
                            Subscribe to status updates or report an issue
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium">
                                Subscribe to Updates
                            </button>
                            <button className="px-6 py-3 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors font-medium">
                                Report an Issue
                            </button>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    );
};

export default Status;